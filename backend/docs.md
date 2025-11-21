# Math API Documentation

This API allows the client to calculate the power of a given base raised to a specified exponent. Additionally, clients can request the square root of the base as part of the response.

## Calculate Power
**Request Format:** `/math/power/:base/:exponent`

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Calculates the result of raising a `base` number to an `exponent` power. Optionally, if a query parameter `root` is provided, the square root of the `base` will also be returned in the response.

**Example Request:** `/math/power/4/2`

**Example Response:**
```json
{
    "result": 16
}
```

**Example Request with Root:** `/math/power/9/2?root=true`

**Example Response with Root:**
```json
{
    "result": 81,
    "root": 3
}
```

**Error Handling:**
- Possible 400 (invalid request) errors (all in JSON):
  - If the `base` or `exponent` is not a valid number, returns an error with message `{"error": "Invalid base or exponent. Please provide numeric values."}`
- Possible 500 errors (all in JSON):
  - If something goes wrong on the server, returns error with `{"error": "Something went wrong; please try again."}`

## Notes:
- The `base` and `exponent` must be provided as part of the URL path.
- Both `base` and `exponent` are expected to be numeric. Non-numeric values will result in an error.
- The optional `root` query parameter does not require a value. Its presence in the request query indicates that the square root of the `base` should also be calculated and included in the response.

---

## Rectangle Calculations Endpoint

- **Path:** `/math/rectangle/:length/:width`
- **Method:** GET
- **Description:** Returns the area and perimeter for a rectangle with the provided dimensions.

### Request Parameters
- **length:** Numeric path parameter for the rectangle’s length.  
- **width:** Numeric path parameter for the rectangle’s width.

### Example Request
`/math/rectangle/4/2`

### Example Response
```json
{
  "length": 4,
  "width": 2,
  "area": 8,
  "perimeter": 12
}

# Circle Calculations Endpoint

- **Path:** `/math/circle/:radius`
- **Method:** GET
- **Description:** Returns the area and circumference for a circle with the provided radius.

## Request Parameters
- **radius:** A numeric path parameter representing the circle’s radius.

## Example Request
`/math/circle/2`

## Example Response
```json
{
  "radius": 2,
  "area": 12.566370614359172,
  "circumference": 12.566370614359172
}
