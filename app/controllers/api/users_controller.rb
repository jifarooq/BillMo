class Api::UsersController < ApplicationController
	def show
		render json: current_user
	end

	def update
		render json: current_user if current_user.update(user_params)
	end

	def index
		@users = User.all
		render json: @users
	end

	private
		def user_params
			params.require(:user).permit(:balance)
		end
end