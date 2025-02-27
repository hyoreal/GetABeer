package be.global.security.auth.cookieManager;

import java.util.Arrays;
import java.util.stream.Stream;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
public class CookieManager {
	public ResponseCookie createCookie(String key, String value) {
		return ResponseCookie.from(key, value)
			.maxAge(24 * 60 * 60) // 하루 설정
			.path("/")
			.secure(true)
			.sameSite("None")
			.httpOnly(true)
			.build();
	}

	public ResponseCookie statCookie(String key, String value) {
		return ResponseCookie.from(key, value)
			.maxAge(2 * 60 * 60) // 두 시간
			.path("/")
			.secure(true)
			.sameSite("None")
			.httpOnly(true)
			.build();
	}

	public String outCookie(HttpServletRequest request, String key) {
		String[] cookies = request.getHeader("Cookie").split(";");
		Stream<String> stream = Arrays.stream(cookies)
			.map(cookie -> cookie.replace(" ", ""))
			.filter(c -> c.startsWith(key));
		String value = stream.reduce((first, second) -> second)
			.map(v -> v.replace(key + "=", ""))
			.orElse(null);

		return value;

        /*String[] cookies = request.getHeader("Cookie").split(";");
        String value = Arrays.stream(cookies)
                .map(cookie -> cookie.replace(" ", ""))
                .filter(c -> c.startsWith(key))
                .findFirst()
                .map(v -> v.replace(key + "=", ""))
                .orElse(null);

        return value;*/
	}
}
