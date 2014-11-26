# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)      not null
#  password_digest :string(255)      not null
#  token           :string(255)      not null
#  gravatar_url    :string(255)
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
	attr_reader :password

	validates :username, :password_digest, presence: true
	validates :password, length: { minimum: 6, allow_nil: true }
	after_initialize :ensure_token

	has_many :bills

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
