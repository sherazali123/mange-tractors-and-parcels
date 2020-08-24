# Manage Parcels

### Requirements

* **Node** => 12.16.3
* **Postgres** 11.6 or later.
* **PostGIS** 2.4.2 or later. 
* **TypeOrm** 0.2.24.
* **React** 16.13.1 or later.
* **Docker** 19.03.8.


### Installation

1. `git clone https://github.com/sherazali123/mange-tractors-and-parcels.git` to clone
2. `cd mange-tractors-and-parcels`
3. `cd backend`.=
4. `yarn`
5. `cd ..`
6. `cd client`
7. `yarn`
8. `cd ..`
9. `docker-compose up --build` (will take some time)
10. Review Graphql schema at http://localhost:6001/graphiql
11. Review React app at http://localhost:3000/
  
Connect Postgres: postgres://postgres:password@127.0.0.1:6432/parcelsdb
  
Test user: sheraz.ali342@gmail.com/123456
