package be.global.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ListResponseDto<T> {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long listCount;
    private List<T> data;

    public ListResponseDto(List<T> data){
        this.data = data;
    }
}
