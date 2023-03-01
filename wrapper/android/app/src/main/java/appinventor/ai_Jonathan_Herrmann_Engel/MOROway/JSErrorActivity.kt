package appinventor.ai_Jonathan_Herrmann_Engel.MOROway

import android.content.ActivityNotFoundException
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.View
import appinventor.ai_Jonathan_Herrmann_Engel.MOROway.databinding.ActivityJserrorBinding
import java.util.*

class JSErrorActivity : MOROwayActivity() {
    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = ActivityJserrorBinding.inflate(
            layoutInflater
        )
        setContentView(binding.root)
        val bundle = intent.extras
        binding.jsErrorEmoji.text = String(Character.toChars(0x1F622))
        binding.jsErrorButtonWebView.setOnClickListener {
            val webViewName = "com.google.android.webview"
            try {
                startActivity(
                    Intent(
                        Intent.ACTION_VIEW,
                        Uri.parse("market://details?id=$webViewName")
                    )
                )
            } catch (exception: ActivityNotFoundException) {
                startActivity(
                    Intent(
                        Intent.ACTION_VIEW,
                        Uri.parse("https://play.google.com/store/apps/details?id=$webViewName")
                    )
                )
            }
        }
        if (bundle == null) {
            binding.jsErrorTextLogIntro.visibility = View.GONE
            binding.jsErrorTextLog.visibility = View.GONE
            binding.jsErrorButtonFeedback.visibility = View.GONE
        } else {
            val errorString = bundle.getString("error")
            if (errorString != null && errorString != "") {
                binding.jsErrorTextLog.text = errorString
            }
            binding.jsErrorButtonFeedback.setOnClickListener {
                startActivity(
                    Intent(
                        Intent.ACTION_VIEW, Uri.parse(
                            String.format(Globals.FEEDBACK_URL, Locale.getDefault().language)
                        )
                    )
                )
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        finishAffinity()
    }
}
