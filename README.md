## How to start
npm install
npm start

## How to create campaigns
Import the required module and enter its parameters.

1. Coupon (id , type , amount)
Type of coupon
- Fixed amount
- Percentage discount

if select type Percentage discount The system will calculate the percentage by just entering numbers (no need to enter %).

2. On Top (id , type , amount)
Type of on top
- Category of product
- Customer Points

if select type Category of product The system will calculate the percentage by just entering numbers (no need to enter %).
if select type Customer Points The system will calculate the discount by point (1 point = 1 baht) and and the discount will not exceed 20% of the total price. (Currently, this applies to all points that can be used.)

3. Seasonal (id , every , amount)
after calculate Coupon > On Top The system will calculate by {every} baht {discount} baht

This part of the web page will focus on the calculation part, causing ui some parts may not be beautiful or have errors. I'm apologize here.
## All part of the code I wrote myself. There was no copying or use of any help. Thank you for your kindness. 🙏🏻
