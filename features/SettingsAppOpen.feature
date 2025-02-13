Feature: Opening the Settings app on Android Emulator then open Networks And Internet settings

  Scenario: Open Networks And Internet settings
    Given I open the Settings app
    Then I verify the app is on the Settings page
    When I open Networks And Internet settings
    Then I should see the Networks And Internet settings
