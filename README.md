# Vehicle Rental API Documentation

This documentation provides information on the API endpoints and usage for a vehicle rental system.

## Starting the Application

To start the application (assuming it's a Node.js application):

1. Navigate to the project directory in your terminal.

2. Install the necessary dependencies using npm :

   ```bash
   npm install
   ```

3. Run the application in development mode :
   ```bash
   npm run dev
   ```

## Running with Docker

To run the application in a Docker container:

1. Build the Docker image :

   ```bash
   docker build -t vehicle .
   ```

2. Run the Docker container in the background, mapping port 8000 to your host machine default port 8000 on Docker :
   ```bash
   docker run -it -p 8000:8000 -d vehicle
   ```

## User Registration

### Register a new user

- **METHOD** : `POST`
- **URL** : `http://127.0.0.1:8000/api/v1/register`

- **Request Body**:
  ```json
  {
    "firstname": "tony",
    "lastname": "stark",
    "email": "tony@gmail.com",
    "password": "tonystark1234",
    "phone": "7896541230"
  }
  ```

## User Login

### Log in as a registered user

- **METHOD** : `POST`
- **URL** : `http://127.0.0.1:8000/api/v1/login`

- **Request Body**:
  ```json
  {
    "email": "tony@gmail.com",
    "password": "tonystark1234"
  }
  ```

## Vehicle Booking

### Book a vehicle (4 wheels)

- **METHOD** : `POST`
- **URL** : `http://127.0.0.1:8000/api/v1/vehicles?wheels=4`

- **Request Body**:

  Example 1 :

  ```json
  {
    "vehicle": {
      "vehicletype": "hatchback",
      "vehiclename": "Audi"
    },
    "email": "tony@gmail.com",
    "startdate": "12-11-2023",
    "enddate": "01-01-2024"
  }
  ```

  Example 2 :

  ```json
  {
    "vehicle": {
      "vehicletype": "suv",
      "vehiclename": "crossover"
    },
    "startdate": "12-11-2023",
    "enddate": "01-01-2024"
  }
  ```

  Example 3 :

  ```json
  {
    "vehicle": {
      "vehicletype": "sedan",
      "vehiclename": "Sports car"
    },
    "startdate": "12-11-2023",
    "enddate": "01-01-2024"
  }
  ```

### Book a vehicle (2 wheels)

- **METHOD** : `POST`
- **URL** : `http://127.0.0.1:8000/api/v1/vehicles?wheels=2`

- **Request Body**:

  Example 1 :

  ```json
  {
    "vehicle": {
      "vehicletype": "cruiser",
      "vehiclename": "Royal Enfield Classic 350"
    },
    "startdate": "12-11-2023",
    "enddate": "01-01-2024"
  }
  ```

  Example 2 :

  ```json
  {
    "vehicle": {
      "vehicletype": "sports",
      "vehiclename": "KTM"
    },
    "startdate": "12-11-2023",
    "enddate": "01-01-2024"
  }
  ```

## Get Vehicle Data

### Retrieve vehicle data

- **METHOD** : `GET`
- **URL** : `http://127.0.0.1:8000/api/v1/vehicles`

## Logout

### Log out as a user

- **METHOD** : `GET`
- **URL** : `http://127.0.0.1:8000/api/v1/logout`

Please make sure to replace the base URL (`http://127.0.0.1:8000`) with the actual API endpoint you are using in your application.
