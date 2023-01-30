#!/bin/bash

# **************** Global variables
while getopts s:r:c: flag
do
    case "${flag}" in
        s) KEYCLOAK_URL=${OPTARG};;
        r) REALM_ID=${OPTARG};;
        c) NEW_CLIENT_ID=${OPTARG};;
    esac
done
echo "Server URL: $KEYCLOAK_URL";
echo "Realm: $REALM_ID";
echo "Client ID: $NEW_CLIENT_ID";

export PROJECT_NAME="MAPPS"


function configureKeycloak() {
    echo "************************************"
    echo " Configure Keycloak realm"
    echo "************************************"

    # Set the needed parameter
    USER=admin
    PASSWORD=admin
    GRANT_TYPE=password
    CLIENT_ID=admin-cli

    access_token=$( curl -d "client_id=$CLIENT_ID" -d "username=$USER" -d "password=$PASSWORD" -d "grant_type=$GRANT_TYPE" "$KEYCLOAK_URL/realms/master/protocol/openid-connect/token" | sed -n 's|.*"access_token":"\([^"]*\)".*|\1|p')

    echo "Access token : $access_token"

    if [ "$access_token" = "" ]; then
        echo "------------------------------------------------------------------------"
        echo "Error:"
        echo "======"
        echo ""
        echo "It seems there is a problem to get the Keycloak access token: ($access_token)"
        echo "The script exits here!"
        echo ""
        echo "If the problem persists, please contact owner of this script"
        echo "------------------------------------------------------------------------"
        exit 1
    fi

    # Create the realm in Keycloak
    echo "------------------------------------------------------------------------"
    echo "Create the realm in Keycloak"
    echo "------------------------------------------------------------------------"
    echo ""

    file_contents=$(<./realm-export-mappsRealm.json)
    file_contents=${file_contents//NEW_REALM_ID/$REALM_ID}
    file_contents=${file_contents//NEW_CLIENT_ID/$NEW_CLIENT_ID}
    # echo $file_contents

    result=$(curl -d "$file_contents" -H "Content-Type: application/json" -H "Authorization: bearer $access_token" "$KEYCLOAK_URL/admin/realms")

    if [ "$result" = "" ]; then
        echo "------------------------------------------------------------------------"
        echo "The realm is created. "
        echo "Open following link in your browser:"
        echo "$KEYCLOAK_URL/admin/master/console/#/realms/$REALM_ID"
        echo "------------------------------------------------------------------------"
    else
        echo "------------------------------------------------------------------------"
        echo "Error:"
        echo "======"
        echo "It seems there is a problem with the realm creation: $result"
        echo "The script exits here!"
        echo ""
        echo "If the problem persists, please contact owner of this script"
        echo "------------------------------------------------------------------------"
        exit 1
    fi
}

echo "************************************"
echo " keycloak"
echo "************************************"

configureKeycloak

echo "************************************"
echo " URLs you can now access are below"
echo "************************************"
echo " - Keycloak : $KEYCLOAK_URL/admin/master/console/#/realms/$REALM_ID"
echo ""
