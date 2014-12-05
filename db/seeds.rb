# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

num_users = 10
num_trans = 10

CREATURES = ["bald-eagle", "bear", "beaver", "beluga-whale", "bill-murray", "bird", 
		"blue-jay", "bluejay", "bunny", "calf", "cardinal", "cat", "cheetah", 
		"chicken", "chimp", "chimpanzee", "chipmunk", "coon", "cow", "deer", 
		"dinosaur", "dog", "doggy", "dolphin", "donkey", "eagle", "elephant", 
		"fawn", "ferret", "fish", "flying-squirrel", "fox", "frog", "giraffe", 
		"goat", "goldfish", "gorilla", "hedgehog", "hippo", "hippopotamus", 
		"horse", "horsie", "kangaroo", "kitten", "kitty", "koala", "leopard", 
		"lion", "monkey", "nicolas-cage", "orly", "otter", "owl", "panda", 
		"panda-bear", "parrot", "penguin", "pig", "piglet", "polar-bear", 
		"pony", "porpoise", "puppy", "python", "rabbit", "raccoon", "raptor", 
		"red-panda", "rhino", "rhinoceros", "rooster", "salamander", "seal", 
		"shark", "sheep", "snake", "squirrel", "sugar-glider", "t-rex", "tortoise", 
		"trex", "turtle", "tyrannosaurus-rex", "velociraptor", 
		"whale", "yarly", "zebra"]

NAMES = [
	"James", "Mary", 
	"John", "Patricia", 
	"Robert", "Jennifer", 
	"Michael", "Elizabeth", 
	"William", "Linda", 
	"David", "Barbara", 
	"Richard", "Susan", 
	"Joseph", "Margaret", 
	"Charles", "Jessica", 
	"Thomas", "Dorothy", 
	"Christopher", "Sarah", 
	"Daniel", "Karen", 
	"Matthew", "Nancy", 
	"Donald", "Betty", 
	"Anthony", "Lisa", 
	"Paul", "Sandra", 
	"Mark", "Helen", 
	"George", "Ashley", 
	"Steven", "Donna", 
	"Kenneth", "Kimberly", 
	"Andrew", "Carol"
]

NOTES = ['ice cream', 'chocolate', 'dog food', 'shampoo', 'gas',
	'energy bill', 'hotel room', 'Vegas', 'movie', 'Netflix subscription',
	'Christmas tree', 'iPhone 6']

COMMENTS = ["it's too cold for ice cream", "nicolas cage is so 1999",
						"why it been so rainy lately?", "no comment", 
						"this site would be cool if real money were involved",
						"so much random generated content",
						"conditioner is better than shampoo"]

def create_user(name)
	User.create!(
		username: name,
		password: name,
		balance: rand(99499) + 500,
		image_url: 'http://placecreature.com/' + CREATURES.sample + '/300/300'
	)
end


#create guest
User.create!(
		username: 'guest',
		password: 'guest',
		balance: rand(99499) + 500,
		image_url: 'http://placecreature.com/nicolas-cage/300/300'
	)
num_users.times { create_user(NAMES.sample) }
guest = User.find_by_username('guest')


#create guest friendships
User.all.each do |user|
	guest.friendships.create!(friend_id: user.id)
end


#create guest transactions
def create_paid_transaction
	guest = User.find_by_username('guest')

	Transaction.create!(
		payer_id: guest.id,
		receiver_id: guest.friends.sample.id,
		amount: rand(989) + 10,
		note: NOTES.sample
	)
end

def create_received_transaction
	guest = User.find_by_username('guest')

	Transaction.create!(
		payer_id: guest.friends.sample.id,
		receiver_id: guest.id,
		amount: rand(989) + 10,
		note: NOTES.sample
	)
end

num_trans.times do 
	create_paid_transaction
	create_received_transaction
end


#create comments
def create_random_comment
	guest = User.find_by_username('guest')
	Comment.create!(
		content: COMMENTS.sample, 
		transaction_id: guest.transactions.sample.id
	)
end

(num_trans * 4).times do 
	create_random_comment
end



