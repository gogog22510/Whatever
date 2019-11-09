package whatever.core;

import org.glassfish.hk2.api.InjectionPointIndicator;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Retention(RUNTIME)
@Target(ElementType.FIELD)
@InjectionPointIndicator
public @interface InjectActor {
    Class value() default Object.class;
}
