Feature: Opening the Settings app on Android Emulator

  Scenario: Open Wi-Fi settings
    Given I open the Settings app
    When I open Wi-Fi settings
    Then I should see the Wi-Fi settings page
