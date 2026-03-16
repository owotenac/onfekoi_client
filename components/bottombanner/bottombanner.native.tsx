import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const AD_UNIT_ID = __DEV__
    ? TestIds.BANNER
    : 'ca-app-pub-5464098617109994/9921445097'; 


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