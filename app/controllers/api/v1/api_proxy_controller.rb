#encoding: utf-8
require 'rest-client'

class Api::V1::ApiProxyController < ApplicationController
  def rank
    render :text => get_to("#{url_base}/rank/")
  end

  def user
    render :text => get_to("#{url_base}/user/#{params[:username]}")
  end

  def domains
    render :text => get_to("#{url_base}/domains/")
  end

  private
  def get_to(url)
    RestClient.get(url, {:params => params_with_appkey})
  end

  def url_base
    "http://karmacracy.com/api/v1"
  end

  def params_with_appkey
    result = params
    result[:appkey] = "katayuno"
    result
  end
end