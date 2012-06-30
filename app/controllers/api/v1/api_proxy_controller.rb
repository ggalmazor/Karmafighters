#encoding: utf-8
require 'rest-client'

class Api::V1::ApiProxyController < ApplicationController
  def rank
    render :text => RestClient.get("#{url_base}/rank/",  {:params => params_with_appkey})
  end

  def user
    render :text => RestClient.get("#{url_base}/user/#{params[:username]}",
                                   {:params => params_with_appkey})
  end

  private
  def url_base
    "http://karmacracy.com/api/v1"
  end

  def params_with_appkey
    result = params
    result[:appkey] = "katayuno"
    result
  end
end