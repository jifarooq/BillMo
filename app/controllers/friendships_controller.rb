class FriendshipsController < ApplicationController
	#need to move this into friends_controller and do it front-end!

	def create
		@friendship = current_user.friendships.new(friendship_params)
		@friendship.try(:save)
		redirect_to users_url
	end

	def destroy
		@friendship = current_user.friendships.find_by_friend_id(params[:id])
		@friendship.try(:destroy)
		redirect_to users_url
	end

  private
  	def friendship_params
  		params.require(:friendship).permit(:user_id, :friend_id)
  	end
end