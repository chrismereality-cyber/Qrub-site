#!/data/data/com.termux/files/usr/bin/bash
API_URL="http://127.0.0.1:3000"
selected=0
filter=""
sort_by="id"
sort_order="asc"

declare -A user_names
declare -A user_ids
user_order=()

fetch_users() {
    local users_json=$(curl -s $API_URL/users)
    user_order=()
    user_names=()
    user_ids=()
    while read -r id name; do
        user_order+=($id)
        user_names[$id]=$name
        user_ids[$id]=$id
    done < <(echo "$users_json" | jq -r '.[] | "\(.id) \(.name)"')
}

display() {
    tput clear
    echo "🚀 Users Dashboard (Arrow ↑/↓, Enter=delete, A=add, F=filter, S=sort, Q=quit)"
    echo "Filter='$filter' | Sort by=$sort_by ($sort_order)"
    echo "--------------------------------------------------"
    local idx=0
    for id in "${user_order[@]}"; do
        local name=${user_names[$id]}
        [[ "$name" != *"$filter"* ]] && continue
        if [ $idx -eq $selected ]; then
            tput setab 4; tput setaf 7
        fi
        printf "%4s: %s\n" "$id" "$name"
        tput sgr0
        idx=$((idx+1))
    done
}

while true; do
    fetch_users
    display
    read -rsn1 key
    case "$key" in
        $'\x1b')  # arrow keys
            read -rsn2 key2
            case "$key2" in
                '[A') selected=$((selected - 1)) ;;
                '[B') selected=$((selected + 1)) ;;
            esac
            ;;
        '')  # Enter -> delete
            id=${user_order[$selected]}
            curl -s -X DELETE $API_URL/delete/$id
            ;;
        [aA])  # Add
            read -rp "Name: " newname
            curl -s -X POST $API_URL/add -H "Content-Type: application/json" -d "{\"name\":\"$newname\"}"
            ;;
        [fF]) read -rp "Filter: " filter ;;
        [sS]) read -rp "Sort by (id/name): " sort_by; read -rp "Order (asc/desc): " sort_order ;;
        [qQ]) tput sgr0; clear; exit 0 ;;
    esac
    # Clamp selection
    total=$(echo "${user_order[@]}" | wc -w)
    [ $selected -lt 0 ] && selected=0
    [ $selected -ge $total ] && selected=$((total - 1))
done
