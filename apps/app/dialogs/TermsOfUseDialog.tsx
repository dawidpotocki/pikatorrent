import React, { useContext } from 'react'
import { Button, Paragraph, XStack, YStack } from 'tamagui'
import { Dialog } from './Dialog'
import { ExternalLink } from '@tamagui/lucide-icons'
import { openExternalLink } from '../lib/links'
import { quitApp } from '../lib/lifecycle'
import { SettingsContext } from '../contexts/SettingsContext'

export const TermsOfUseDialog = () => {
  const { settings, updateSettings } = useContext(SettingsContext)

  const handleAccept = async () => {
    updateSettings({ isTermsOfUseAccepted: true })
  }

  if (settings.isTermsOfUseAccepted) {
    return null
  }

  return (
    <Dialog
      title="Terms of use"
      open
      snapPoints={[30]}
      dismissOnOverlayPress={false}
      dismissOnSnapToBottom={false}
    >
      <YStack maxWidth={500}>
        <Paragraph>
          By using PikaTorrent, you accept the content you download or share is
          your sole responsability.
        </Paragraph>
        <XStack ai="center">
          <Paragraph> You also accept the</Paragraph>
          <Button
            ml="$2"
            size="$2"
            icon={ExternalLink}
            onPress={() => {
              openExternalLink('https://www.pikatorrent.com/privacy-policy')
            }}
          >
            privacy policy.
          </Button>
        </XStack>
      </YStack>
      <XStack jc="flex-end" mt="$2" gap="$2">
        <Button onPress={quitApp}>Cancel</Button>
        <Dialog.Close displayWhenAdapted asChild onPress={handleAccept}>
          <Button theme="yellow">Accept</Button>
        </Dialog.Close>
      </XStack>
    </Dialog>
  )
}
