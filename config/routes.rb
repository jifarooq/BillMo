BillMo::Application.routes.draw do
  root to: 'static_pages#root'

  resources :users
  resource :session, only: [:new, :create, :destroy]
  resources :friendships, only: [:create, :destroy]

  namespace :api, defaults: { format: :json} do
  	resources :transactions, except: [:new, :update, :edit] do
      resources :comments, only: :index
    end

  	resources :friends, only: :index
    resources :comments, only: [:create, :destroy]
  	resource :user, only: [:show, :update]
  end
end
