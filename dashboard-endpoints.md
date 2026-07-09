Here is your cleaned **.md endpoints-only version** (no extra explanations, just structured endpoints):

---

# 🔷 1. DASHBOARD (OVERVIEW TAB)

## 📊 Summary

```text
GET /dashboard/summary
```

## 🧾 Overview Data

```text
GET /dashboard/recent-orders?limit=10
```

```text
GET /dashboard/top-products?limit=5
```

---

# 🔷 2. PRODUCTS TAB

## 📦 Read

```text
GET /products
```

```text
GET /products/:id
```

## ➕ Create

```text
POST /products
```

## ✏️ Update

```text
PUT /products/:id
```

## 🗑 Delete

```text
DELETE /products/:id
```
### category brand subcategry 
add delete edit



---

# 🔷 3. ORDERS TAB

## 📦 Read

```text
GET /orders
```

```text
GET /orders/:id
```
## update
```
patch / orders/:id/staus
```

---

# 🔷 4. CUSTOMERS TAB

## 👥 Read

```text
GET /customers
```

```text
GET /customers/:id
```

## 📊 Data

```text
GET /customers/:id/orders
```

```text
GET /customers/:id/stats
total spend
total oreders
```

## 🗑 Delete
```text
DELETE /customers/:id
```
