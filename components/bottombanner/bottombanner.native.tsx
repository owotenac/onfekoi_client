import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const AD_UNIT_ID = __DEV__
    ? TestIds.BANNER
    : 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX'; // Replace with your actual AdMob ad unit ID


export default function BottomBanner() {
    return (
        <BannerAd
            unitId={AD_UNIT_ID}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{ requestNonPersonalizedAdsOnly: false }}
            onAdLoaded={() => console.log('✅ Pub chargée')}
            onAdFailedToLoad={(error) => console.log('❌ Erreur pub:', error)}
        />
    )
}