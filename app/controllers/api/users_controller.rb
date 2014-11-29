class Api::UsersController < ApplicationController
	def index
		render json: current_user
	end

	def update
		current_user.update(user_params)
		render json: current_user
	end

	private
		def user_params
			params.require(:user).permit(:balance)
		end
end