class Api::FriendsController < ApplicationController
	def index
		@friends = current_user.friends
		render json: @friends
	end

	def update
		@friend = current_user.friends.find(params[:id])
		render json: @friend if @friend.update(friend_params)
	end

	private
		def friend_params
			params.require(:friend).permit(:balance)
		end

end