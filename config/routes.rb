BillMo::Application.routes.draw do
  root to: 'static_pages#root'

  resources :users
  resource :session, only: [:new, :create, :destroy]
  resource :messages, only: [:new, :create]

  namespace :api, defaults: { format: :json} do
    resources :friends, only: [:index, :update]
    resources :friendships, only: [:index, :create, :destroy]

    resources :users, only: :index
    resource :user, only: [:show, :update]

    resources :comments, only: [:create, :destroy]

  	resources :transactions, except: [:new, :update, :edit] do
      resources :comments, only: :index
    end
  end
end
