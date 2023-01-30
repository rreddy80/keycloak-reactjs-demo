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
        echo "If the problem persists, please contact someone from Devops."
        echo "------------------------------------------------------------------------"
        exit 1
    fi

    # Create the realm in Keycloak
    echo "------------------------------------------------------------------------"
    echo "Create the realm in Keycloak"
    echo "------------------------------------------------------------------------"
    echo ""

    result=$(curl -d @./realm-export-mappsRealm.json -H "Content-Type: application/json" -H "Authorization: bearer $access_token" "$KEYCLOAK_URL/admin/realms")

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
        echo "Please delete the existing applications in your `Code Engine` project: $PROJECT_NAME"
        echo "and run this script again."
        echo ""
        echo "If the problem persists, please contact thomas.suedbroecker@de.ibm.com or create a GitHub issue."
        echo "------------------------------------------------------------------------"
        exit 1
    fi
}

echo "************************************"
echo " keycloak"
echo "************************************"

configureKeycloak

echo "************************************"
echo " URLs"
echo "************************************"
echo " - Keycloak : $KEYCLOAK_URL/admin/master/console/#/realms/$REALM_ID"
echo ""
