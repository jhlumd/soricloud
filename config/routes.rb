Rails.application.routes.draw do
    root to: 'static_pages#root'

    namespace :api, defaults: {format: :json} do
        get 'users/check_email', to: 'users#check_email'
        resource :users, only: [:create, :show]
        resource :session, only: [:create, :destroy]
    end
end
