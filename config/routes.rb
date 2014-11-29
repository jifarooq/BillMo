BillMo::Application.routes.draw do
  root to: 'static_pages#root'

  resources :users
  resource :session, only: [:new, :create, :destroy]
  resources :friendships, only: [:create, :destroy]

  namespace :api, defaults: { format: :json} do
  	resources :transactions, except: [:new, :update, :edit]
  	resources :friends, only: :index

    #TA question!
    #this should really be a singular resource, 
    #but update isn't working properly on backbone side
  	resources :users, only: [:index, :update]
  end
end
