package appinventor.ai_Jonathan_Herrmann_Engel.MOROway

import android.content.Context
import android.content.pm.ActivityInfo
import android.content.res.Configuration
import android.os.Bundle
import android.webkit.WebView
import androidx.appcompat.app.AppCompatActivity
import java.util.Locale

open class MOROwayActivity : AppCompatActivity() {
    override fun attachBaseContext(base: Context) {
        val settings = base.getSharedPreferences("MOROwaySettings", MODE_PRIVATE)
        val language = settings.getString("lang", "")
        val region = settings.getString("langRegion", "")
        val configuration = base.resources.configuration
        if (language != null) {
            if (language.isNotEmpty()) {
                val locale = if (region.isNullOrEmpty()) {
                    Locale(language)
                } else {
                    Locale(language, region)
                }
                Locale.setDefault(locale)
                configuration.setLocale(locale)
            }
        }
        super.attachBaseContext(base.createConfigurationContext(configuration))
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        lockActivity()
    }

    fun initWeb(webView: WebView, gameView: Boolean) {
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        if (gameView) {
            webView.settings.useWideViewPort = true
            webView.settings.builtInZoomControls = false
            webView.settings.setSupportZoom(false)
        }
    }

    private fun lockActivity() {
        val settings = getSharedPreferences("MOROwayAnimSettings", MODE_PRIVATE)
        val lockOrientationLandscape = settings.getBoolean("lockOrientationLandscape", false)
        requestedOrientation = if (lockOrientationLandscape) {
            ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE
        } else {
            ActivityInfo.SCREEN_ORIENTATION_SENSOR
        }
    }
}
