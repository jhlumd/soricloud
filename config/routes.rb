Rails.application.routes.draw do
    root to: 'static_pages#root'

    namespace :api, defaults: {format: :json} do
        get 'users/check_email', to: 'users#check_email'
        resources :users, only: [:create, :show]
        resources :tracks, only: [:index, :show, :create, :update, :destroy]

        resource :session, only: [:create, :destroy]
    end
end
