BillMo::Application.routes.draw do
  # root to: 'sessions#new'
  root to: 'static_pages#root'

  resources :users
  resource :session, only: [:new, :create, :destroy]
end
