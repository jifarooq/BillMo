class Api::PaidTransactionsController < ApplicationController

	def create 
		@paid_trans = current_user.paid_transactions.new(trans_params)
		# current_user.balance -= @paid_trans.amount
		debugger

		if @paid_trans.save
			# current_user.save
			render json: @paid_trans
		else
			render json: @paid_trans.errors.full_messages, status: :unprocessable_entity
		end
	end

	def index
		@all_paid_trans = current_user.paid_transactions
		render :index
	end

	def show
		@paid_trans = current_user.paid_transactions.find(params[:id])
		render json: @paid_trans
	end

	def destroy
		@paid_trans = current_user.paid_transactions.find(params[:id])
		@paid_trans.try(:destroy)
		render json: {}
	end

	private

	def trans_params
		params.require(:paid_transaction).permit(:amount, :note, :payer_id, :receiver_id)
	end

end