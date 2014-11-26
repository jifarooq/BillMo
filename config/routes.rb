BillMo::Application.routes.draw do
  # root to: 'sessions#new'
  root to: 'static_pages#root'

  resources :users
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json} do
  	resources :paid_transactions, except: [:new, :update, :edit]
  end
end
