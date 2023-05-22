import { H3, XStack, YStack } from 'tamagui'
import { Logo } from './Logo'
import { H1 } from 'tamagui'

export const Header = ({ theme }: any) => {
  return (
    <YStack ai="center" gap="$2">
      <XStack ai="center">
        <Logo width={64} height={64} theme={theme} />
        <H1 color="$yellow9" fontWeight="$6">
          Pika
        </H1>
        <H1 fontWeight="$6">Torrent</H1>
      </XStack>
      <H3>A next-generation BitTorrent client.</H3>
    </YStack>
  )
}
