# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)      not null
#  password_digest :string(255)      not null
#  token           :string(255)      not null
#  image_url       :string(255)
#  created_at      :datetime
#  updated_at      :datetime
#  balance         :float            default(1000.0)
#

class User < ActiveRecord::Base
	attr_reader :password

	validates :username, :password_digest, presence: true
	validates :password, length: { minimum: 4, allow_nil: true }
	after_initialize :ensure_token

	has_many :friendships
	has_many :friends, through: :friendships

	has_many(
		:paid_transactions, 
		class_name: 'Transaction',
		foreign_key: :payer_id
	)

	has_many(
		:received_transactions, 
		class_name: 'Transaction',
		foreign_key: :receiver_id
	)

	def is_friend?(user)
		self.friends.include?(user)
	end

	# previously used on user show page.  Not used anymore so that one can see
	# friend's balance updates appropriately after transaction 
	def estimated_balance
		real_bal = self.balance
		error = rand(real_bal / 10)
		est_balance = (rand(2) == 0) ? real_bal - error : real_bal + error
		est_balance.round(2)
	end

	def transactions
	  Transaction.where('payer_id = ? OR receiver_id = ?', id, id)
	end

	def password=(password)
		@password = password
		self.password_digest = BCrypt::Password.create(password)
	end

	def is_password?(password)
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end

	def self.find_by_credentials(username, password)
		user = User.find_by_username(username)
		return nil unless user
		user.is_password?(password) ? user : nil
	end

	def reset_token!
		self.token = SecureRandom::urlsafe_base64(16)
		self.save!
		self.token
	end

	private

		def ensure_token
			self.token ||= SecureRandom::urlsafe_base64(16)
		end

end
