BillMo::Application.routes.draw do
  root to: 'static_pages#root'

  resources :users
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json} do
  	resources :transactions, except: [:new, :update, :edit] do
      resources :comments, only: :index
    end

  	resources :friends, only: :index
    resources :friendships, only: [:index, :create, :destroy]
    resources :comments, only: [:create, :destroy]
    resources :users, only: :index
  	resource :user, only: [:show, :update]
  end
end
