class api::ApiController < ApplicationController
	before_action :require_login!
end