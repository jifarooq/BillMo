# BillMo
A clone of Venmo with a bill split calculator before logging in

#### See it <a href='http://billmo.herokuapp.com/'>live</a>

## Features
- Changes <a href='https://github.com/jifarooq/BillMo/blob/master/app/assets/javascripts/split_calc.js'>splitter</a> amounts and names, scraped from Social Security top 100 <a href='https://github.com/jifarooq/BillMo/blob/master/app/assets/javascripts/names.js'>names</a>, on refresh
- Heavily uses jQuery and <a href='https://github.com/jifarooq/BillMo/tree/master/app/assets/javascripts'>Backbone</a> to create rich user experience and interactivity
- Merges paid and received transactions seamlessly with AR <a href='https://github.com/jifarooq/BillMo/blob/master/app/models/user.rb'>query</a>
- <a href='https://github.com/jifarooq/BillMo/blob/master/app/views/sessions/_form.html.erb'>Animates</a> guest login with setTimeout

## Navigation
- In bill splitter, use buttons to add/delete bills and persons
- Login as guest to enter web app
