class Api::FriendshipsController < ApplicationController
	#need to move this into friends_controller and do it front-end!
	def create
		@friendship = current_user.friendships.new(friendship_params)
		@friendship.try(:save)
		render json: @friendship
	end

	def destroy
		@friendship = current_user.friendships.find(params[:id])
		@friendship.try(:destroy)
		render json: {}
	end

	def index
		@friendships = current_user.friendships
		render json: @friendships
	end

  private
  	def friendship_params
  		params.require(:friendship).permit(:user_id, :friend_id)
  	end
end