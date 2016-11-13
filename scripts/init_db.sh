
# Check to see if mysql is installed
command -v mysql >/dev/null 2>&1 || {
    echo >&2 "I require mysql but it's not installed.  Aborting."; exit 1;
}

echo "MYSQL username default:<root>";


read input_variable;

USERNAME=$input_variable;

if [ -z "$USERNAME" ]; then
    USERNAME="root";
fi;

echo "MYSQL password default:none";

read input_variable;

PASSWORD=$input_variable;

if [ -z "$PASSWORD" ]; then
    PASSWORD=""
else
    PASSWORD="-p $PASSWORD";
fi

mysql -u $USERNAME $PASSWORD < ./db/schema.sql