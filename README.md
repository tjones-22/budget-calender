


## database

# commands for initializing prisma with sqlite 

1.
npm install prisma -D
npm install @prisma/client

2.
npx prisma init --datasource-provider sqlite

To run a migration
npx prisma migrate dev --name init

NOTE: change the datasource.url to "file:/prisma/app.db"