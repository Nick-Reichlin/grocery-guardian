Setup Instructions:

Download project:
- git clone project


To Start the Database using Docker:
- Start the docker dameon: sudo dockerd
- Start postgres image and container
	- docker run -name my-postgres -e POSTGRES_HOST_AUTH_METHOD = trust -d -p 5432:5432 "id"
- Generate prisma: npx prisma generate
- Prisma migrate: npx prisma migrate dev -name init
- View: npx prisma studio
- Run project: npm run dev
- Seed the database
