class SessionsController < ApplicationController
	def new
	end

	def create
  	user = User.find_by_credentials(
			params[:user][:username],
			params[:user][:password])

		if user
			sign_in!(user)
		else
			flash[:errors] = user.errors.full_messages
			render :new
		end
	end

	def destroy
		sign_out
	end
end
