require_relative 'agile_central'
require_relative 'quality'


if __FILE__ == $PROGRAM_NAME
  include AgileCentral
  include Quality
  @browser = Watir::Browser.new :firefox
  @browser.goto("https://us1.rallydev.com")

  login("jmanhart@test.com","Password")
  navigate_to("Quality", "Test Cases")
  change_project("proj3")
  change_workspace("farnaz's WS")
  create_new_test_case_edit_popup
  test_case_enter_name("Jeff Test")
  save_and_close_edit_modal
  @browser.close



end
