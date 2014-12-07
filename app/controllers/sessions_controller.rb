class SessionsController < ApplicationController
	before_action do
		# redirect_to "/" if current_user
	end

	def new
	end

	def create
  	user = User.find_by_credentials(
			params[:user][:username],
			params[:user][:password])

		if user
			sign_in!(user)
		else
			flash[:errors] = [true]
			render :new_fail
		end
	end

	def destroy
		sign_out
	end
end
