# Database: Postgress in Docker

> docker run --name gostack_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

# Database: Run migrations

> yarn typeorm migration:run

# Database: Mongo in Docker

> docker run --name mongodb -p 27017:27017 -d -t mongo

# Database: Redis in Docker

> docker run --name redis -p 6379:6379 -d -t redis:alpine


# TODO list

## Recover password
**RF**
- The user should recover your password by indicating your email
- The user should be receiving an email with instructions to recover
- The user should recover your password

**RNF**
- Use the lib Mailtrap to test send mails in the developer environment
- Use Amazon SES to send in the production environment
- Send mails should happen in a background job

**RN**
- The email link expires in 2h
- The password should be confirmed by the user

## Update profile
**RF**
- The user should update your name, email, and password

**RN**
- The user cannot update your email to already used email
- To update your password, the user should be filling your old password
- To update your password, the user should confirm your new password

## Provider dashboard
**RF**
- The user should be list yours appointments from a specific day
- The provider should ever receive a notification when there a new appointment
- The provider should see your notifications not read

**RFN**
- The appointments from the provider should be store in the cache
- The notifications from the provider should be store on MongoDB
- The notifications from the provider should be sent in real-time using Socket.io

**RN**
- The notification should be status of reading or not read

## Schedule appointment
**RF**
- The user should be list all providers
- The user should list all days of the month, with at least a provider available
- The user should be list all clean schedules from a provider on one day
- The user should be a create a new appointment

**RFN**
- The list of providers should be cached

**RN**
- All appointments should be during 1h
- The appointments should be available between 8h and 18h (first on 8h, last in 17h)
- The user should not be scheduled for provider unavailable in the time
- The user should not be scheduled in the past time
- The user should not be an appointment to yourself
