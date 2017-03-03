require 'watir-webdriver'

module Quality

  #hovers on the actions dropdown and chooses the Create new Test Case action, switches window focus to edit modal
  def create_new_test_case_edit_popup()
    @browser.span(:id, 'actions').hover
    @browser.link(:id, 'new').visible?
    puts "Expanded Actions menu succesfully"
    @browser.link(:id, 'new').click
    Watir::Wait.until { @browser.windows.size == 2 }
    puts "Found Create Popup window"
    @browser.window(:index, 1).use
    @browser.div(:id, 'edit_header').visible?
    puts "Switched focus to edit window successfully"
  end

  def test_case_enter_name(tc_name )
    @browser.text_field(:name, 'name').set tc_name
  end

end
