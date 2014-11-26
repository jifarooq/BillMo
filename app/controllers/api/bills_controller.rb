class Api::BillsController < ApplicationController

	def create 
		@bill = current_user.bills.Bill.new(bill_params)

		if @bill.save
			render json: @bill
		else
			render json: @bill.errors.full_messages, status: :unprocessable_entity
		end
	end

	private

	def bill_params
		params.require(:bill).permit(:amount, :note, :user_id)
	end

end