# PCCAttendanceChecker-Next
PCCAttendanceChecker-Next is an attendance management application designed to work in conjunction with PCCClient. It is currently available only in PC Room 3.

## Prerequisites
 - Node.js v18.13.x or higher
 - pnpm or npm v9.5.x or higher

## Installation.
1. Clone this repository
2. Run `npm install` to install dependencies.
3. Run `node CreateRecords.js && node register.js` to build DB.
3. Run `npm run build && npm start` to build and start the application. (Port: 3000)

## Docker
1. build DB  
`docker run --mount type=bind,source="$(pwd)"/attend.sqlite,target=/data/attend.sqlite ghcr.io/pccsuite/pccattendancechecker-next init`
2. start
`docker run -p 3000:3000 --mount type=bind,source="$(pwd)"/attend.sqlite,target=/data/attend.sqlite ghcr.io/pccsuite/pccattendancechecker-next`

## Usage
Access http://[localhost or IP]

- Dashboard
  - Displays the currently active computer in blue
- Records
  - You can browse information stored in the database, search by filters, etc.

## License
This project is licensed under the Apache License 2.0 license. See the LICENSE.md file for details.

## Author
- Clover_Midori

## Contact
- Discord: Clover_Midori#7637
- Twitter: [@Clover_0916](https://twitter.com/@Clover_0916)

