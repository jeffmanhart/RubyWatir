require 'watir-webdriver'

module AgileCentral

# login to the application with given Username and Password, will need the goto and URL used prior to using this function
  def login(username, password)
    #Login page locators
    username_el = @browser.text_field(:id, 'j_username')
    password_el = @browser.text_field(:id, 'j_password')
    sign_in_el = @browser.button(:id, 'login-button')

    #check to make sure page is loaded
    username_el.exists?
    password_el.exists?

    #Login to application
    username_el.set username
    password_el.set password
    sign_in_el.click
    container = @browser.div(:id, 'dashboard-container')

    #validate login occurs to Dashboard page
    until container.exists? do sleep 1 end
    puts "Logged in"
  end

# Navigate to pages through clicking the tab.  Note: page_name requires the exact value of the tab name(case sensitive)
  def navigate_to(tab_name, page_name)
    tab_downcase = tab_name.downcase
    @browser.link(:title, tab_name).click
    @browser.link(:text, page_name).visible?
    puts "Found #{page_name}"
    @browser.link(:text, page_name).click
    @browser.span(:text, page_name).wait_until_present
    puts "Navigated to #{page_name} successfully"
  end

# Can navigate to any project in current workspace scope
  def change_project(project_name)
    @browser.div(:class, "project-nav-label").click
    @browser.div(:id, "project_nav").visible?
    puts "Opened Project Navigation dropdown"
    @browser.div(:id, "project_nav_expand_all").click
    @browser.link(:text, project_name).click
    Watir::Wait.until {@browser.div(:class, "project-nav-label").text.include? project_name }
    puts "Navigated to #{project_name} successfully"
  end

# Can navigate to any workspace associated to logged in user
  def change_workspace(workspace_name)
    current_project_name = @browser.div(:class, "project-nav-label").text
    @browser.div(:class, "sp-picker icon-workspace").click
    @browser.div(:text, "WORKSPACES").visible?
    puts "Opened Workspace Navigation dropdown"
    @browser.div(:text, workspace_name).click
    Watir::Wait.until { !@browser.div(:class, "project-nav-label").text.include? current_project_name }
    puts "Navigated to #{workspace_name} successfully"
  end

  def save_and_close_edit_modal
    @browser.button(:id, "save_and_close_btn").click
    Watir::Wait.until { @browser.windows.size == 1 }
    puts "Closed Popup window"
    @browser.window(:index, 0).use
    puts "Switched focus to main window"
  end

end
