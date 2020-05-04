Rails.application.routes.draw do
    root to: 'static_pages#root'

    namespace :api, defaults: {format: :json} do
        get 'users/check_login_input', to: 'users#check_login_input'
        resources :users, only: [:create, :show, :update]
        resources :tracks, only: [:index, :show, :create, :update, :destroy] do
            resources :comments, only: [:index]
        end
        resources :comments, only: [:create, :destroy]
        resource :session, only: [:create, :destroy]
    end
end
