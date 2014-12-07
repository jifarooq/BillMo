class Api::TransactionsController < ApplicationController
	def create 
		@trans = current_user.transactions.new(trans_params)

		if @trans.save
			render json: @trans
		else
			render json: @trans.errors.full_messages, status: :unprocessable_entity
		end
	end

	def index
		@all_trans = current_user.transactions
		render :index
	end

	def show
		@trans = current_user.transactions.find(params[:id])
		render json: @trans
	end

	def destroy
		@trans = current_user.transactions.find(params[:id])
		@trans.try(:destroy)
		render json: {}
	end

	private
		def trans_params
			params.require(:transaction).permit(:amount, :note, :payer_id, :receiver_id)
		end

end